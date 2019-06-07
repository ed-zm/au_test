import React, { Component } from 'react'
import { Layout } from 'antd'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from '../config/initApollo'

const getComponentDisplayName = (newComponent) => {
  return newComponent.displayName || newComponent.name || 'Unknown'
}

const WithNextData = (ComposedComponent) => {
  class WithData extends Component {
    constructor(props) {
      super(props)
      this.apollo = initApollo()
    }
    static async getInitialProps(ctx) {
      this.displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
      let composedInitialProps = {}
      if(ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }
      if(!process.browser) {
        const apollo = initApollo()
        try {
          await getDataFromTree(
            <ApolloProvider client = { apollo }>
              <ComposedComponent { ...composedInitialProps } />
            </ApolloProvider>
          )
        } catch(e) {
          console.log(e)
        }
        Head.rewind()
      }
      return composedInitialProps
    }
    render() {
      return(
        <ApolloProvider client = { this.apollo }>
          <Layout>
            <Layout.Content>
              <ComposedComponent />
            </Layout.Content>
          </Layout>
        </ApolloProvider>
      )
    }
  }

  return WithData
}

export default WithNextData