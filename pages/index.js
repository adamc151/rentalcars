import Head from 'next/head'
import Homepage from '../containers/Homepage/Homepage';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Rentalcars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Homepage />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
        }
      `}</style>

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
