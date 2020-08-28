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
    }
  `)

  const allDataJson = result.data.allDataJson.nodes.sort(
    (a, b) => a.index - b.index
  )
  const menuList = allDataJson.map(node => ({
    index: node.index,
    category: node.category,
  }))
  const itemList = allDataJson.map(node => node.items).flat()

  actions.createPage({
    path: '/',
    component: path.resolve('./src/templates/main.js'),
    context: {
      menuList,
    },
  })

  actions.createPage({
    path: '/all',
    component: path.resolve('./src/templates/listAll.js'),
    context: {
      menuList,
    },
  })

  menuList.forEach(menu => {
    const category = menu.category
    actions.createPage({
      path: `/${category}`,
      component: path.resolve('./src/templates/list.js'),
      context: {
        menuList,
        category,
      },
    })
  })

  itemList.forEach(item => {
    const itemName = item.name
    const itemNameSplit = itemName.split(/\s/g)
    actions.createPage({
      path: `/${itemNameSplit[0].toLowerCase()}/${itemNameSplit[1]}`,
      component: path.resolve('./src/templates/detail.js'),
      context: {
        menuList,
        itemName,
      },
    })
  })
}
