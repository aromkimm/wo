import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Popup = ({ closePopup }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              description
            }
          }
        }
      `}
      render={data => {
        let desc = data.site.siteMetadata.description.split('\n')
        let lines = []
        let pos = -1

        for (let i in desc) {
          let line = desc[i]
          !line
            ? (pos += 1)
            : lines[pos]
            ? (lines[pos] += line)
            : (lines[pos] = line)
        }

        return (
          <aside>
            <div className="inner">
              {lines.map((line, index) => (
                <div key={index} className="content">
                  {line}
                </div>
              ))}
              <button className="close" onClick={closePopup}>
                닫기
              </button>
            </div>
          </aside>
        )
      }}
    />
  )
}

export default Popup
