"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.svg";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const isBuilder = pathName === "/resume-builder";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">OpenResume</span>
          <Image
            src={logoSrc}
            alt="OpenResume Logo"
            className="h-8 w-full"
            priority
          />
        </Link>

        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {isBuilder && (
            <span
              onClick={() => {
                const fileName = `My Resume ${
                  new Date().toISOString().split("T")[0]
                }.html`;
                const redirectTo = location.href;
                const fileContent = `
              <html xmlns="http://www.w3.org/1999/xhtml">    
                <head>      
                  <title>The Tudors</title>      
                  <meta http-equiv="refresh" content="0;URL='${redirectTo}'" />    
                </head>    
                <body> 
                <script type="text/javascript">
                    window.location.href = "${redirectTo}"; //change this to the URL
                                                                   //you want to redirect to
                  </script>
                </body>  
              </html>
              `;
                const blob = new Blob([fileContent], {
                  type: "text/html",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
              }}
              className="cursor-pointer rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              Download Link
            </span>
          )}
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Parser"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
          <div className="ml-1 mt-1">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=parsadotsh&repo=open-resume-with-save&type=star&count=true"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
