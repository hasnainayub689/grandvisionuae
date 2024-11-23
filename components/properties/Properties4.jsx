"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import FetchDataComponent from "./../../fetchApi"; // Adjust if needed

export default function Properties4() {
    const [properties, setProperties] = useState([]); // State to store fetched data
    const [expandedDescription, setExpandedDescription] = useState(null); // Track expanded description
    const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched

    // Callback to handle fetched data
    const handleDataFetched = useCallback((data) => {
        console.log('Fetched data:', data); // Log the entire data for inspection
        
        if (data?.data?.list && data.data.list.length > 0) {
            const formattedData = data.data.list.map((property) => ({
                id: property.id,
                imgSrc: property.photos?.[0] || "", // Use the first photo or fallback
                title: property.description || "No Title Available",
                address: property.region || "No Region",
                beds: property.newParam?.bedroomMin || 0,
                baths: property.newParam?.bathroomMin || "N/A", // Added fallback for baths
                sqft: property.newParam?.minSize || 0,
                avatar: property.agent?.avatar || "/default-avatar.png", // Ensure fallback avatar
                agent: property.agent?.name || "Unknown Agent",
                price: property.price || 0,
                description: property.description || "No description available", // Ensure description is present
            }));
            setProperties(formattedData); // Update state with transformed data
            setDataFetched(true); // Mark as fetched
        } else {
            setProperties([]); // If no properties available, clear state
            setDataFetched(true); // Mark as fetched
        }
    }, []);

    // Define the payload to send
    const payload = {
        1: 20, // Fetch 20 properties (for example)
        // Add other dynamic parameters here if needed
    };

    // Log the properties state to see if it's being updated correctly
    useEffect(() => {
        console.log("Properties state:", properties); // Log the state to ensure it's populated
    }, [properties]);

    // Truncate description if it's longer than a specified length
    const truncateDescription = (description, length = 100) => {
        return description.length > length ? description.substring(0, length) + "..." : description;
    };

    // Handle expanding and collapsing the description
    const toggleDescription = (id) => {
        setExpandedDescription(expandedDescription === id ? null : id);
    };

    return (
        <section className="flat-section">
            {/* Render FetchDataComponent only if data has not been fetched */}
            {!dataFetched && <FetchDataComponent onDataFetched={handleDataFetched} payload={payload} />}

            <div className="container">
                <div className="box-title">
                    <div className="text-center wow fadeInUp">
                        <div className="text-subtitle text-primary">Top Properties</div>
                        <h3 className="title mt-4">Best Property Value</h3>
                    </div>
                </div>

                {properties.length > 0 ? (
                    <div className="swiper tf-sw-mobile non-swiper-on-767">
                        <div className="tf-layout-mobile-md xl-col-3 md-col-2 swiper-wrapper">
                            {properties.map((property, index) => (
                                <div key={index} className="swiper-slide">
                                    <div className="homelengo-box">
                                        <div className="archive-top">
                                            <Link
                                                href={`/property-details-v1/${property.id}`}
                                                className="images-group"
                                            >
                                                <div className="images-style">
                                                    <Image
                                                        className="lazyload"
                                                        data-src={property.imgSrc}
                                                        alt={property.title || "Property"}
                                                        src={property.imgSrc}
                                                        width={615}
                                                        height={405}
                                                    />
                                                </div>
                                                <div className="top">
                                                    <ul className="d-flex gap-6">
                                                        <li className="flag-tag primary">Featured</li>
                                                        <li className="flag-tag style-1">For Sale</li>
                                                    </ul>
                                                </div>
                                                <div className="bottom">{property.address}</div>
                                            </Link>
                                        </div>
                                        <div className="archive-bottom">
                                            <div className="content-top">
                                                <h6 className="text-capitalize">
                                                    <Link
                                                        href={`/property-details-v1/${property.id}`}
                                                        className="link"
                                                    >
                                                        {property.title}
                                                    </Link>
                                                </h6>
                                                <ul className="meta-list">
                                                    <li className="item">
                                                        <i className="icon icon-bed" />
                                                        <span className="text-variant-1">Beds:</span>
                                                        <span className="fw-6">{property.beds}</span>
                                                    </li>
                                                    <li className="item">
                                                        <i className="icon icon-bath" />
                                                        <span className="text-variant-1">Baths:</span>
                                                        <span className="fw-6">{property.baths}</span>
                                                    </li>
                                                    <li className="item">
                                                        <i className="icon icon-sqft" />
                                                        <span className="text-variant-1">Sqft:</span>
                                                        <span className="fw-6">{property.sqft}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="content-bottom">
                                                <div className="d-flex gap-8 align-items-center">
                                                    <div className="avatar avt-40 round">
                                                        <Image
                                                            alt="Agent Avatar"
                                                            src={property.avatar}
                                                            width={34}
                                                            height={34}
                                                        />
                                                    </div>
                                                    <span>{property.agent}</span>
                                                </div>
                                                <h6 className="price">${property.price.toFixed(2)}</h6>

                                                <div className="description">
                                                    {/* Check if description should be truncated */}
                                                    {property.description.length > 100 && expandedDescription !== property.id ? (
                                                        <>
                                                            {truncateDescription(property.description)}
                                                            <button
                                                                onClick={() => toggleDescription(property.id)}
                                                                className="read-more"
                                                            >
                                                                Read More
                                                            </button>
                                                        </>
                                                    ) : (
                                                        // Display full description
                                                        <>
                                                            {property.description}
                                                            <button
                                                                onClick={() => toggleDescription(property.id)}
                                                                className="read-more"
                                                            >
                                                                Read Less
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No properties available</p>
                )}
            </div>
        </section>
    );
}
