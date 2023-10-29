import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid2 from "../components/NFT/NFTGrid2";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Creators from "../components/Creators/Creators"
export default function Gallery() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxWidth="lg">
       <h1 className={styles.navMiddle}>TOP CREATORS</h1>
      {/* <p>Browse which NFTs are available from the collection.</p>
      */}
      <Creators
      
      data={data}
      isLoading={isLoading}
      emptyText={
        "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
      }/>
      <h1 className="text-center">EXPLORE OUR EXCITING COLLECTION</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid2
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
       <div className={styles.navMiddle}>
                <Link className={styles.button} href="/buy">
                  Browse our full collection<i className="fa fa-arrow-right"></i>
                </Link>
                {/* <Link
                  className={styles.secondaryCta}
                  href="https://github.com/thirdweb-example/marketplace-v3"
                  target="_blank"
                >
                  GitHub
                </Link> */}
              </div>
    </Container>
  );
}
