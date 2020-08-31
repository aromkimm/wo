import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { navigate, Link, StaticQuery, graphql } from 'gatsby'
import logoPath from '../../static/logo.png'

const Header = ({ menuList, background }) => {
  const [hash, setHash] = useState(null)

  useEffect(() => {
    function handleActiveMenu () {
      const newHash = window.location.hash.split('#')[1] || null
      if (hash !== newHash) {
        setHash(newHash)
      }
    }
    handleActiveMenu()
    window.addEventListener('hashchange', handleActiveMenu)
    return () => window.removeEventListener('hashchange', handleActiveMenu)
  }, [hash])

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              author
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: `author`,
                content: data.site.siteMetadata.author,
              }
            ]}
          />
          <header style={{ background: `${background ? '#fff' : null}` }}>
            <h1>
              <button onClick={() => {
                hash
                  ? navigate(`#${hash}`, {replace: true})
                  : navigate('/')
              }}>
                <img src={logoPath} alt={data.site.siteMetadata.title} />
              </button>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link activeClassName="active" to="/all">ALL</Link>
                </li>
              </ul>
              <ul>
                {menuList.map(menu => (
                  <li key={menu.index}>
                    <Link
                      activeClassName="active"
                      className={`${hash === menu.category ? 'active' : ''}`}
                      partiallyActive={true}
                      to={`/${menu.category}`}
                    >
                      {menu.category.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
        </>
      )}
    />
  )
}

export default Header
