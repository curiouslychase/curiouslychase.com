import { OnlineFrequent } from "@/components/Content/OnlineFrequent";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="global-footer my-8 py-4 border-t border-border gap-4 max-w-5xl mx-auto flex flex-col md:flex-row">
      <div className="mt-4 md:w-3/4 [&>.online-frequent>div>h2]:text-lg [&>.online-frequent>div>h2]:border-none [&>.online-frequent>div>h2]:pb-0 [&>.online-frequent]:mt-0">
        <OnlineFrequent />
      </div>
      <div className="mt-4 md:w-1/4 text-sm">
        <h3 className="text-base font-bold mt-0">Links</h3>
        <ul className="p-0 m-0 pt-4 md:pt-0 list-none">
          <li>
            <Link href="/sitemap.xml">Sitemap</Link>
          </li>
          <li>
            <Link href="/rss.xml">RSS Feed</Link>
          </li>
          <li>
            <Link href="/about/">About Me</Link>
          </li>
          <li>
            <Link href="/posts/">Blog</Link>
          </li>
          <li>
            <Link href="/design-system/">Design System</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
