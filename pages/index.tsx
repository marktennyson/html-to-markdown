import React, { useState } from "react";
import type { NextPage } from "next";
import NavbarScreen from "@/components/NavbarScreen";
import { Card, CardBody, Textarea, Button } from "@nextui-org/react";
import TurndownService from "turndown";
import ClipboardIcon from "@/components/ClipboardIcon";
import useMedia from 'use-media';

const Homepage: NextPage = () => {
  const turndownService = new TurndownService();
  const [markdownVal, setMarkdownVal] = useState<string>("");
  const isDesktopDevice = useMedia({ minWidth: '1024px' });
  const convertToMarkdown = (htmlString: string) => {
    const markdown = turndownService.turndown(htmlString);
    setMarkdownVal(markdown);
  };

  const handleCopyClick = async () => {
    try {
        await window.navigator.clipboard.writeText(markdownVal);
    } catch (err) {
        console.error(
            "Unable to copy to clipboard.",
            err
        );
        alert("Copy to clipboard failed.");
    }
};

  return (
    <main className="min-h-screen flex flex-col">
      <NavbarScreen />
      <p className="text-white text-center mt-6 text-7xl">
        <span className={`font-extrabold text-amber-500 italic uppercase`}>html</span> to{" "}
        <span className="text-red-500 font-extrabold italic">Markdown</span>{" "}
        <span className="text-blue-500 font-extrabold">Converter</span>
      </p>
      <div className="flex-grow sm:grid sm:grid-cols-2 gap-8 px-8 mt-8 mb-4 dark:text-black">
        <Card className="flex-grow">
          <CardBody className="h-full bg-danger-600 dark:!bg-danger-50">
            <div className="flex justify-between px-4">
              <p className="uppercase text-2xl font-bold text-warning-300 dark:text-warning-600">
                html
              </p>
              {/* <ClipboardIcon className="text-warning-300 dark:stroke-warning-600" /> */}
            </div>
            <Textarea
              color="warning"
              variant="faded"
              placeholder="Enter the html content"
              className="h-full"
              onValueChange={convertToMarkdown}
              minRows={isDesktopDevice? 33:10}
              maxRows={33}
              classNames={{
                input: "h-full",
                inputWrapper: "!h-full text-black dark:text-white",
                label: "",
              }}
            />
          </CardBody>
        </Card>
        <Card className="flex-grow mobile:mt-6">
          <CardBody className="h-full bg-success-600 dark:!bg-success-50">
            <div className="flex justify-between px-4">
              <p className="uppercase text-2xl font-bold text-primary-100 dark:text-primary-600">
                markdown
              </p>
              <Button isIconOnly variant="light" onPress={handleCopyClick}>
              <ClipboardIcon className="stroke-primary-100 dark:stroke-primary-600" />
              </Button>
            </div>
            <Textarea
              readOnly
              color="primary"
              variant="faded"
              className="h-full"
              value={markdownVal}
              minRows={isDesktopDevice? 33:10}
              maxRows={33}
              classNames={{
                input: "h-full",
                inputWrapper: "!h-full text-black dark:text-white",
                label: "text-2xl font-bold",
              }}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default Homepage;
