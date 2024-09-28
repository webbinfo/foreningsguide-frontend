import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import RichText from './RichText';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DictionaryItemProps {
  word: string;
  definition: BlocksContent;
  aliases: string;
  index: number;
}

function colorMapper(index: number) {
  const black = " text-black group-data-[hover]:text-black/80";
  
  switch (index % 4) {
    case 0:
      return 'bg-coral' + black;
    case 1:
      return 'bg-mint' + black;
    case 2:
      return 'bg-chalk' + black;
    default:
      return 'bg-yellow' + black;
  }
}

function formatAliases(aliases: string) {
  if (aliases) {
    return aliases.split(',').map((alias) => alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase()).join(', ');
  }
  else return '';
}

export default function DictionaryItem({ word, definition, index, aliases }: DictionaryItemProps) {
  return (
    <div id={word.toLowerCase()} className={`mx-auto w-full max-w-lg divide-y divide-coral/5 ${colorMapper(index)} rounded-lg  mb-4`}>
      <Disclosure as='div' className='p-6' id={word.toLowerCase()}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className='text-lg font-medium '>
            {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
          </span>
          <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>

        <DisclosurePanel className={`mt-2 text-sm/5 text-black/80 `}>
          {aliases ? <p className={`text-left pb-2 'text-black/60`}>
            Alternativ:
            <i> {formatAliases(aliases)}</i>
          </p> : null}
          <div className='text-left'>
            <RichText content={definition} />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}