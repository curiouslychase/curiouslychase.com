"use client";

import Link from "next/link";
import { FC, PropsWithChildren, useCallback, useState } from "react";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { log } from "@/utils/logger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "mx-auto",
        "md:my-4",
        "md:mx-2",
        "lg:mx-0",
        "flex flex-col md:flex-row",
        "flex-wrap",
        "md:flex-nowrap",
        "max-w-5xl",
        "justify-between",
        "md:gap-2",
        "items-center"
      )}
    >
      <div className="order-1 justify-self-start p-2 items-center flex gap-2 md:p-0 basis-3/6 md:basis-1/3">
        <Link
          href="/"
          className={cn(
            "font-bold text-2xl gap-2 items-center",
            "flex flex-col md:my-0 md:flex-row justify-center md:justify-start"
          )}
        >
          <Image
            src="/img/magic-512x512.png"
            alt="Chase Adams"
            width={20}
            height={20}
          />
          <span className="lowercase duration-30">Chase Adams</span>
        </Link>
      </div>
      <div
        className={cn(
          "md:ml-auto flex items-center",
          "order-3 md:order-2",
          "gap-2"
        )}
      >
        <NavigationMenu className={cn("md:flex")}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle({
                  active: !!pathname.match("^/$"),
                })()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/posts/"
                className={cn(
                  navigationMenuTriggerStyle({
                    active: log(!!pathname.match("/posts")),
                  })()
                )}
              >
                Posts
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about/"
                className={navigationMenuTriggerStyle({
                  active: !!pathname.match("/about"),
                })()}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="https://www.thefuturefluent.com"
                className={cn(
                  navigationMenuTriggerStyle({ active: false })(),
                  "pr-0"
                )}
              >
                The Future Fluent
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </div>
  );
};

const HeaderLink: FC<PropsWithChildren<{ href: string; target?: string }>> = ({
  href,
  children,
  ...rest
}) => {
  return (
    <Link href={href} className="text-md" {...rest}>
      {children}
    </Link>
  );
};

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const form = useForm<ContactFormInputs>({});
  const onSubmit: SubmitHandler<ContactFormInputs> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pt-4 flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input type="text" {...form.register("name")} />
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" {...form.register("email")} />
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <Label htmlFor="message">Message</Label>
          <Textarea {...form.register("message")} />
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
