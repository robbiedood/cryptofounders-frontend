// 擺放 dummy data, 文字/影音
// 在連結後端數據庫前使用

const coinData01 = {
  name: 'ROBBIEBOO',
  founder: 'Robbie Boo',
  contractAddress: '0x43Aff28614345F8E3629f60dee18ce10Cb77C939',
  whitePaper: 'Get a set of high-res screen wallpapers for your mobile or laptop device :)',
  metrics: {
    marketPrice: '3 GoerliEth',
    totalSupply: 55,
    numOfHolders: 3,
    numOfTransactions: 3
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'Robbie Boo',
      headshot: '',
      address: '0xC6dA50f22Da6E783E45C5898E8bC1616B5c88B25', //暫時用Sandy的
      ens: 'robbieboo.eth',
      amount: 33,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Lynna Lin',
      headshot: '',
      address: '0x37547F26D022AaF1768d73c0F1F29f83dC1d8d93',
      ens: 'jing.eth',
      amount: 20,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 2,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coinData02 = {
  name: 'GRACE',
  founder: 'Grace Lee',
  contractAddress: '0x454EBaD31cBdf32A77475e677a682C4830F5B8d6',
  whitePaper: 'Can have 1:1 meeting with me for a human design graph reading.',
  metrics: {
    marketPrice: '1 GoerliEth',
    totalSupply: 55,
    numOfHolders: 2,
    numOfTransactions: 1
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'Grace Lee',
      headshot: '',
      address: '0xC6dA50f22Da6E783E45C5898E8bC1616B5c88B25', //暫時用Sandy的
      ens: 'robbieboo.eth',
      amount: 53,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 2,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coinData03 = {
  name: 'YEAD',
  founder: 'Yarue Tsai',
  contractAddress: '0x0aa989b0BC72d75ed90Bf037774c0d092DF39a50',
  whitePaper: '1:1 meeting on early childhood education in the language immersion setting',
  metrics: {
    marketPrice: '1 GoerliEth',
    totalSupply: 33,
    numOfHolders: 2,
    numOfTransactions: 1
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'Yarue T.',
      headshot: '',
      address: '0x656A5D15CCd861C23b8B75C9dF69FF097F53Da15', //暫時用Sandy的
      ens: '',
      amount: 31,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 2,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coinData04 = {
  name: 'DONDON',
  founder: 'DonDon Cheng',
  contractAddress: '0x140BD69B9D113500c651eAdd233E6a89A2D2F519',
  whitePaper: 'Join all kind of outdoor/indoor activities with DonDon, enjoying snowboarding, fishing, hiking and BBQ trip.',
  metrics: {
    marketPrice: '1 GoerliEth',
    totalSupply: 33,
    numOfHolders: 2,
    numOfTransactions: 1
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'DonDon Cheng',
      headshot: '',
      address: '0xb5eB3E8BaFeb61ab2359f294a1499E3550681170', //暫時用Sandy的
      ens: '',
      amount: 32,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 1,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coinData05 = {
  name: 'TREE',
  founder: 'Kyle Lin',
  contractAddress: '0x1486FBE10F6E5Afe1d4A62515805dc7a51c8cedf',
  whitePaper: '留學諮詢以及1:1訪談及單位參觀, 包含但不限於 Stanford University',
  metrics: {
    marketPrice: '1 GoerliEth',
    totalSupply: 33,
    numOfHolders: 2,
    numOfTransactions: 2
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'Kyle Lin',
      headshot: '',
      address: '0xD535A061089c2fEfE9a5C6244b0152f12aE8E472', //暫時用Sandy的
      ens: '',
      amount: 32,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 1,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coinData06 = {
  name: 'SANDY',
  founder: 'Sandy Lu',
  contractAddress: '0x51217db8C438f9Cee6F5dB1127d0b535A9DB949A',
  whitePaper: 'People can use this coin to get the Australian studying abroad life sharing service. (graduate from the University of Queensland)',
  metrics: {
    marketPrice: '1 GoerliEth',
    totalSupply: 55,
    numOfHolders: 2,
    numOfTransactions: 6
  },
  media: {
    headshot: '',
    photo: '',
    video: '',
    chart: ''
  },
  holders: [
    {
      name:'Sandy Lu',
      headshot: '',
      address: '0xC6dA50f22Da6E783E45C5898E8bC1616B5c88B25', //暫時用Sandy的
      ens: '',
      amount: 53,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },
    {
      name:'Luke Lu',
      headshot: '',
      address: '0x79794E4EBc00339AB21E0C9Fc492BeD60d4824Fc',
      ens: 'chlu.eth',
      amount: 2,
      testimonial: 'Testimonial: Lorem ipsum dolor sit amet consectetur. Mi sed in integer nunc pharetra viverra faucibus praesent sodales. Vivamus diam varius nunc sit eget malesuada cursus neque. Sem ullamcorper pellentesque a adipiscing sapien eu imperdiet. Diam nunc urna quis facilisi dictum in praesent lobortis sed. Lectus netus aenean cursus arcu integer fringilla ultricies venenatis erat. Erat condimentum aliquam.',
    },

  ]
}

const coins = [
  coinData01, coinData02, coinData03, coinData04, coinData05, coinData06
]

export {
  coins
}