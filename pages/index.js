import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import HeaderButton from "../components/mini/HeaderButton";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
      <>
        <Banner/>
        <HeaderButton text={'Admin Panel'} href={'/login'}/>
      </>
)
}
