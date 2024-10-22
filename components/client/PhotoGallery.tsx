"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from 'lucide-react'

interface Props {
    sources: string[]
}

export default function PhotoGallery({ sources }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Calculate total pages
    const totalPages = Math.ceil(sources.length / itemsPerPage)

    // Get the images for the current page
    const currentImages = sources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentImages.map((src, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                                <Image
                                    src={src}
                                    alt={`Photo ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl w-full bg-transparent border-none">
                            <div className="relative aspect-square">
                                <Image
                                    src={src}
                                    alt={`Photo ${index + 1}`}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
