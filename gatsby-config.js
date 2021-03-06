module.exports = {
  siteMetadata: {
    title: 'WO',
    author: 'Saerom Kim',
    description: `
    온라인에서 각종 상품을 판매할 경우, 가장 처음 노출되는 한 장의 이미지로
    최대한의 시선을 끌어야 한다. 그 때문에 상품 자체 이미지 외의 다른 시각적
    요소가 썸네일에 동원 되기도 하는데, ‘물’의 이미지가 사용되는 모습은 특히
    자주 목격된다. 물은 판매하는 상품이 화장품인 경우 보습감을 강조하거나,
    전자 기기인 경우 방수가 된다는 것을 나타내는 등 각 제품 특성에 해당하는
    여러 의미를 내포할 수 있다. 그러나 액체로서 정해진 형태가 없기 때문에
    실제로 썸네일에서 드러나는 형상 또한 제각각이다.

    WO(Water Ornaments)는 물이 조형적으로 다양하게 연출된 온라인
    판매 상품의 이미지들을 모아 제품이 아닌 ‘오너먼트로써의 물’을
    중점적으로 보여주는 온라인 쇼핑몰 형식의 웹 사이트다. 카테고리와
    제품의 사양, 소비를 유도하기 위해 작성된 상세한 설명 문구 등은
    일반적인 온라인 쇼핑몰의 형식을 닮아 있다.`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './data/',
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
  ],
  pathPrefix: '/wo',
}
