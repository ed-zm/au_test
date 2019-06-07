import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return(
      <html>
        <Head>
          <link rel = 'stylesheet' href = '//cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.min.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}