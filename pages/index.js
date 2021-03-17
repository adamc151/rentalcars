import Head from 'next/head'
import styles from './index.module.css';
import LocationsSearch from '../containers/LocationsSearch/LocationsSearch';
import Header from '../components/Header/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rentalcars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <Header></Header>
          <h1 className={styles.heading}>Car Hire – Search, Compare & Save</h1>
          <div className={styles.searchWrapper}>
            <h2>Where are you going?</h2>
            <p id="searchBarLabel">Pick-up Location</p>
            <div className={styles.ctas}>
              <LocationsSearch />
              <button className={styles.searchButton}>Search</button>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
