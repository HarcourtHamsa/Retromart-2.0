import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "../NFT/NFT";
import styles from "../../styles/Buy.module.css";
import { useState, useEffect } from "react";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  filteredIDs?: string[]; // Add a prop to pass the IDs you want to filter
};

export default function Creators({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
  filteredIDs = ['1','2','3'], // Default to an empty array
}: Props) {
  const [filteredData, setFilteredData] = useState<NFTType[]>(data || []);

  useEffect(() => {
    // Filter the data based on the IDs to be excluded
    if (data) {
      const filteredNFTs = data.filter((nft) => !filteredIDs.includes(nft.metadata.id));
      setFilteredData(filteredNFTs);
    }
  }, [data, filteredIDs]);

  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : filteredData.length > 0 ? (
        filteredData.slice(0, 10).map((nft, index) => {
          if (index >= 5) return null; // Exit the loop after 10 items
          return !overrideOnclickBehavior ? (
            <Link
              href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
              className={styles.nftContainer}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              className={styles.nftContainer}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          );
        })
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}
