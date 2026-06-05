// lib/facebook-scraper.ts
export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
}

export async function getDynamicFacebookPosts(): Promise<FacebookPost[]> {
  try {
    console.log("🔄 Starting Facebook posts fetch...");

    // Try scraping first (most reliable)
    const scrapedPosts = await scrapeFacebook();
    if (scrapedPosts.length > 0) {
      console.log(
        `✅ Found ${scrapedPosts.length} REAL Facebook posts via scraping`
      );
      return scrapedPosts;
    }

    // If scraping fails, try direct API
    console.log("🔄 Scraping failed, trying direct API...");
    const apiPosts = await tryFacebookAPI();
    if (apiPosts.length > 0) {
      console.log(`✅ Found ${apiPosts.length} posts via API`);
      return apiPosts;
    }

    // If both fail completely, return empty array
    console.log("❌ No posts found via any method - showing empty state");
    return [];
  } catch (error) {
    console.error("❌ Error in getDynamicFacebookPosts:", error);
    return [];
  }
}

async function scrapeFacebook(): Promise<FacebookPost[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    console.log(`🔍 Scraping Facebook from: ${baseUrl}/api/scrape-facebook`);

    const response = await fetch(`${baseUrl}/api/scrape-facebook`, {
      next: { revalidate: 3600 }, // 1 hour cache
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("📊 Scraping response:", data);
      return data.posts || [];
    } else {
      console.log("❌ Scraping API failed with status:", response.status);
      return [];
    }
  } catch (error) {
    console.log("❌ Scraping error:", error);
    return [];
  }
}

async function tryFacebookAPI(): Promise<FacebookPost[]> {
  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;

    if (!appId || !appSecret) {
      console.log("❌ Missing Facebook API credentials");
      return [];
    }

    console.log("🔑 Trying Facebook Graph API...");
    const response = await fetch(
      `https://graph.facebook.com/v19.0/CXPMotozone/posts?fields=id,message,created_time,full_picture,permalink_url&limit=6&access_token=${appId}|${appSecret}`,
      { next: { revalidate: 3600 } }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("📊 API response received");
      return data.data || [];
    } else {
      console.log("❌ Facebook API failed with status:", response.status);
      const errorText = await response.text();
      console.log("❌ API error details:", errorText);
      return [];
    }
  } catch (error) {
    console.log("❌ Facebook API error:", error);
    return [];
  }
}
