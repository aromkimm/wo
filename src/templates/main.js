import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import BackgroundImg from 'gatsby-background-image'
import Slider from '../libs/slider'

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider'
import Header from '../components/header'
import Popup from '../components/popup'

const MainPage = ({ pageContext }) => {
  const [init, setInit] = useState(false)
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const images = useRef()

  useEffect(() => {
    if (!init) {
      setInit(true)
      new Slider(images.current)
    }
  }, [init])

  return (
    <StaticQuery
      query={graphql`
        query {
          allFile(filter: { name: { eq: "index" }, ext: { eq: ".png" } }) {
            nodes {
              relativeDirectory
              childImageSharp {
                fluid(maxWidth: 1366, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <Header menuList={pageContext.menuList} background={false} />
          <section style={{ paddingTop: 0 }}>
            <ul
              ref={images}
              className="images"
              style={{
                transition: 'opacity .5s ease-in-out',
                opacity: `${state.popupVisible ? 0.2 : ''}`
              }}
            >
              {pageContext.menuList.map(menu => {
                const category = menu.category
                const img = data.allFile.nodes.find(node =>
                  node.relativeDirectory.includes(category)
                )
                return (
                  <li data-hash={category} key={menu.index}>
                    <Link to={`/${category}`}>
                      <BackgroundImg
                        fluid={img.childImageSharp.fluid}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
          {(() => {
            if (state.popupVisible) {
              return (
                <Popup closePopup={() => {
                  dispatch({ type: 'POPUP_VISIBLE', value: false })
                }} />
              )
            }
          })()}
        </div>
      )}
    />
  )
}

export default MainPage
