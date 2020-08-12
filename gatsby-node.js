const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    query {
      allDataJson {
        nodes {
          index
          category
          items {
            name
          }
        }
      }
      allFile(filter: {name: {eq: "index"}, ext: {eq: ".png"}}) {
        nodes {
          publicURL
          relativePath
        }
      }
    }
  `)

  const allDataJson = result.data.allDataJson.nodes.sort((a, b) => a.index - b.index)
  const menuList = allDataJson.map(node => ({index: node.index, category: node.category}))
  const itemList = allDataJson.map(node => node.items).flat()
  const mainImgList = result.data.allFile.nodes

  actions.createPage({
    path: '/',
    component: path.resolve('./src/pages/main.js'),
    context: {
      menuList,
      mainImgList 
    },
  })

  actions.createPage({
    path: '/all',
    component: path.resolve('./src/pages/listAll.js'),
    context: {
      menuList
    },
  })

  menuList.forEach(menu => {
    const category = menu.category
    actions.createPage({
      path: `/${category}`,
      component: path.resolve('./src/pages/list.js'),
      context: {
        menuList,
        category
      },
    })
  })

  itemList.forEach(item => {
    const itemName = item.name
    const itemNameSplit = itemName.split(/\s/g)
    actions.createPage({
      path: `/${itemNameSplit[0].toLowerCase()}/${itemNameSplit[1]}`,
      component: path.resolve('./src/pages/detail.js'),
      context: {
        menuList,
        itemName
      },
    })
  })
}