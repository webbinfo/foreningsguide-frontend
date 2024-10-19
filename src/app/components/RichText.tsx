"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

function addDictHighlight(text: any, dict: Array<string>) {
  const dictSet = new Set(dict.flatMap(item => item.split(',').map(phrase => phrase.trim().toLowerCase())));
  const regex = new RegExp(`\\b(${Array.from(dictSet).join('|')})\\b`, 'gi');

  return text.map((block: any) => {
    if (block.type.name === "Text") {
      const highlightedText = block.props.text.replace(regex, (match: string) => {
        const definingWord = findDefiningWord(Array.from(dictSet), match.toLowerCase());
        return `<a class="hl-text" href="/ordlista#${definingWord}">${match}</a>`;
      });
      return <div dangerouslySetInnerHTML={{ __html: highlightedText }} key={block.key} />;
    } else {
      return block;
    }
  });
}

function findDefiningWord(searchArray: Array<string>, keyword: string) {
  for (const item of searchArray) {
    const [definingWord, ...aliases] = item.split(",").map(str => str.trim().toLowerCase());
    if (aliases.includes(keyword)) {
      return definingWord;
    }
  }
  return keyword;
}

export default function RichText({ content, checkDict = false, dictionaryItems = [] }: { content: BlocksContent, checkDict?: boolean, dictionaryItems?: Array<string> }) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || "Missing alternate text"}
            />
          );
        },
        link: ({ children, url }) => <Link href={url} target="_blank">{children}</Link>,
        list: ({ children, format }) => {
          return format == "ordered" ? <ol>{children}</ol> : <ul>{children}</ul>;
        },
        heading: ({ children, level }) => {
          return React.createElement(`h${level}`, {}, children);
        },
        // Funkar lite halvbra nu, lägger till en ny rad efter länkar
         paragraph: ({ children }) => {
          if (checkDict && dictionaryItems.length > 0) {
            return <p>{addDictHighlight(children, dictionaryItems)}</p>
          } else {
            return <p>{children}</p>
          }
        },
        quote: ({ children }) => {
          return (
            <div className="relative flex flex-col m-4">
              <i className="absolute top-0 left-0 text-4xl transform -translate-y-4">“</i>
              <p className="pt-4 px-8">{children}</p>
              <i className="absolute bottom-0 right-0 text-4xl transform rotate-180 translate-y-4">”</i>
            </div>
          );
        },
      }}
    />
  );
}