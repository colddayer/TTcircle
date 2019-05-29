Page({
  data: {
    circleDetail:
    {
      leader:'张继科',
      name: '东华理工大学球友圈',
      members: 100,
      arena: '东华理工大学乒乓球馆',
      table: 16,
      img: '../../images/394.jpg',
      time: '14:00 -- 20:30',
      address: '江西省南昌市青山湖区广兰大道418号东华理工大学体育馆一楼乒乓球馆',
      introduce: '以球会友，互相交流，互娱互乐，共同乒搏，推广国球文化，让更多乒乓球兴趣爱好者走到一起互相认识，提高球技，培养球德。'
    },
    applyed:false
  },
  apply(){
    this.setData({
      applyed:true
    })
  }
})