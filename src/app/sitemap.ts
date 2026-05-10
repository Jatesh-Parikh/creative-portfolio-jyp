import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const client = createClient();
    const homepage = await client.getSingle("homepage");
    const pages = await client.getAllByType("page");
    const blogPosts = await client.getAllByType("blog_post");
    const projects = await client.getAllByType("project");

    const siteRoot = "https://portfolio-jyp.netlify.app";

    const homepageRoute = {
        url: siteRoot,
        lastModified: homepage.last_publication_date,
    };

    const pagesRoute = pages.map((page) => ({
        url: siteRoot + "/" + page.uid,
        lastModified: page.last_publication_date,
    }));

    const blogPostsRoute = blogPosts.map((post) => ({
        url: siteRoot + "/" + post.uid,
        lastModified: post.last_publication_date,
    }));

    const projectsRoute = projects.map((project) => ({
        url: siteRoot + "/" + project.uid,
        lastModified: project.last_publication_date,
    }));

    return [homepageRoute, ...pagesRoute, ...blogPostsRoute, ...projectsRoute];
}