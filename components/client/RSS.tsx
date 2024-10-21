"use client"

import { rssService } from "@/lib/http/client"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import xml2js from "xml2js"

interface Props {
    id: string,
    token: string
}

interface RSSItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    enclosure?: {
        "$": {
            type : string,
            url : string
        };
    }
}

export default function RSSComponent({ id, token }: Props) {
    const [rssEntry, setRssEntry] = useState<any>()
    const [rssItems, setRSSItems] = useState<RSSItem[]>([])

    useEffect(() => {
        async function GetRSS() {
            try {
                const res = await rssService.getRSSById(id, token)
                const xmlres = await axios.get(res.data.data.source)

                setRssEntry(res.data.data)

                const parser = new xml2js.Parser({ explicitArray: false });
                const result = await parser.parseStringPromise(xmlres.data);

                const items = result.rss.channel.item;
                setRSSItems(items);
                console.log(items)
            } catch (error) {
                console.error(error)
            }
        }
        GetRSS()
    }, [id, token])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6 text-center">{rssEntry?.name || "RSS"} Feed</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rssItems.map((item, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {item.enclosure && (
                            <Image
                                src={item.enclosure["$"].url}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                                width={200}
                                height={200}
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2 text-black">{item.title}</h2>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Read more
                            </a>
                            <p className="text-sm text-gray-400 mt-4">
                                Published on: {new Date(item.pubDate).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
