const Menu = [
  {
    id: 1,
    name: 'Bắt đầu vụ',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413078/menu/land_kxmvcy.png',
    route: 'TempScreen',
    type: ['NPK (16-16-8)', 'NPK (20-20-15)', 'Đạm', 'Lân', 'Kali', 'Canxi'],
  },
  {
    id: 2,
    name: 'Bón phân',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605412811/menu/fertilizer_vo99pz.png',
    route: 'TempScreen',
    type: ['NPK (16-16-8)', 'NPK (20-20-15)', 'Đạm', 'Lân', 'Kali', 'Canxi'],
  },
  {
    id: 3,
    name: 'Làm đất',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413659/menu/043-shovel_pffe3f.png',
    route: 'SupportScreen',
  },
  {
    id: 4,
    name: 'Quan sát hằng ngày',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413200/menu/observation_fmulcu.png',
    route: 'TempScreen',
  },
  {
    id: 5,
    name: 'Sâu hại',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413422/menu/025-caterpillar_plwxfi.png',
    route: 'TempScreen',
    type: {
      'Sâu đục trái': [
        'Bướm đẻ trứng trên trái Xoài non (30-45 NSĐT) ở phần đít trái, sâu có khoang trắng đỏ trên lưng, sâu non đục một lổ nhỏ và chui vào trong ăn phần thịt trái, sâu lớn tấn công vào ăn hạt Xoài, vết đục tạo điều kiện cho nấm, vi khuẩn xâm nhập làm thối trái, trái non rụng nhiều, cắt trái Xoài có sâu nằm bên trong.',
        'Thu gom những trái bị hại đem tiêu hủy.',
      ],
      'Rầy bông xoài': [
        'Gây hại trên các bộ phận non như bông, đọt, lá và trái non, rầy chích hút làm lá không phát triển, lá bị cong, rìa lá khô, phát bông bị khô, trái không phát triển và rụng đi. Rầy còn thải ra mật đường làm cho nấm bồ hóng phát triển mạnh gây đen bông và trái. Khi vào vườn xoài có rầy hiện diện sẽ nghe những tiếng động nhỏ do rầy di chuyển nên rất dễ phát hiện.',
        [
          'Tỉa cành tạo điều kiện thông thoáng để hạn chế sự phát triển của rầy.',
          'Cách phòng trị',
        ],
      ],
      'Rệp sáp': [
        'Có nhiều loài rệp sáp gây hại trên Xoài nhưng quan trọng là loài gây hại trên trái vì chúng gây ảnh hưởng đến chất lượng, năng suất và giá trị của trái. Rệp sáp ở mặt dưới lá, chích hút nhựa lá non, cuống trái, chất thải của rệp tạo điều kiện nấm bồ hống phát triển làm cho trái chậm lớn.',
        [
          '- Bảo tồn thiên địch như: ong ký sinh và bọ rùa ... để hạn chế rệp sáp.',
          '- Phun thuốc hóa học như : dầu khoáng DS 98.8 EC, Admire 050 EC, Supracide 40 EC.',
        ],
      ],
      'Ruồi đục quả xoài': [
        'Ruồi trưởng thành màu vàng, cánh trong, hoạt động vào ban ngày, đẻ trứng lên quả phần tiếp giáp giữa vỏ và thịt quả, trứng hình quả chuối màu trắng ngà sau chuyển sang màu vàng nhạt. Giòi nở ra đục vào trong ăn thịt trái, vỏ trái nơi ruồi đục vào có màu đen, mềm, ứ nhựa, tạo điều kiện cho nấm bệnh tấn công làm thối trái và có thể bị rụng hoặc vẫn đeo trên cây. Ruồi làm nhộng trong đất quanh gốc cây, sau đó vũ hóa, chui lên mặt đất. Ruồi đục quả là đối tượng kiểm dịch khi xuất nhập khẩu trái cây. Ruồi tấn công lên nhiều loại cây trồng, trái Xoài bị ruồi đục làm giảm giá trị thương phẩm, chất lượng và không xuất khẩu được.',
        [
          '- Thu, hái và đem tiêu hủy toàn bộ trái rụng trên mặt đất và trái còn đeo trên cây vì là nơi ruồi lưu tồn.',
          '- Dùng feremone dẩn dụ để giết ruồi đực.',
          '- Phun mồi protein thủy phân: Do ruồi cái thích ăn protein để phát triển trứng, ruồi đực phát triển tinh trùng, nên có thể dùng bả mồi protein để diệt ruồi. Pha 4cc Malate 73 EC với 55cc mồi protein trong 1 lít nước. Phun 200cc hổn hợp này cho 1 cây, phun theo từng điểm, để dẫn dụ và diệt ruồi. Đây là phương pháp hiệu quả và phù hợp với sản xuất trái cây theo hướng an toàn và khuyến cáo áp dụng đồng loạt cả khu vực.',
        ],
      ],
      'Bọ cắt lá': [
        'Thường gây hại nặng trong vườn ươm cây con hoặc ở vườn xoài mới ra đọt non vào mùa khô. Thành trùng là bọ cánh cứng màu nâu vàng, đầu và ngực màu đỏ cam, miệng là cái vòi dài. Thành trùng thường đẻ trứng trên bìa lá non vào ban đêm, sau đó bọ cắn lá như cắt ngang chừa 1/3 lá trên cây, trứng sẽ theo 2/3 lá cắt rơi xuống đất, sau 2 ngày ấu trùng sẽ nở ra, ăn phần lá rơi và hóa nhộng dưới mặt đất. Bọ cắt lá gây ảnh hưởng đến sự sinh trưởng và ra hoa rất lớn, do làm giảm diện tích lá trên chồi.',
        [
          '- Điều khiển cây ra đọt non đồng loạt.',
          '- Thu dọn các lá bị hại trong vườn đem tiêu hủy.',
        ],
      ],
      'Nhện đỏ': [
        'Sống tập trung ở mặt dưới những lá đã chuyển sang màu xanh, chích hút dịch lá, trái làm cho lá có màu đồng hoặc xám bạc và làm vỏ trái sần sùi gây hiện tượng da cám. Dọc gân chính của lá có nhiều vết lấm tấm nhỏ, đó là lớp da củ của nhện sau lột xác còn để lại. Nhện đỏ phát triển mạnh khi thời tiết nắng nóng, quan sát kỹ mặt dưới lá sẽ thấy chúng di chuyển.',
        [
          '- Dùng vòi nước áp lực cao phun phía dưới mặt lá.',
          '- Bảo tồn thiên địch để hạn chế được sự bộc phát của nhện.',
          '- Khi mật số nhện cao, có thể sử dụng thuốc hóa học để phòng trị.',
        ],
      ],
      'Bọ trĩ': [
        'Thành trùng có kích thước rất nhỏ 0,1-0,2 mm, khó nhìn thấy bằng mắt thường. Cả con trưởng thành và ấu trùng đều tập trung ở bộ phận non của cây như đọt non, lá non, hoa và trái để chích hút nhựa. Trên lá non làm lá thâm đen và cong queo, mép lá cụp xuống, trên trái tạo thành vùng da cám xung quanh cuống trái và tạo vết thương giúp vi khuẩn xâm nhập gây bệnh xì mủ trái, gây hại nặng có thể làm cho cả hoa Xoài cháy khô. Bù lạch phát triển mạnh khi thời tiết nắng nóng và sinh sản rất nhanh nên rất mau kháng thuốc.',
        [
          '- Dùng vòi nước áp lực cao phun phía dưới mặt lá.',
          '- Dùng dầu khoáng DS 98.8 EC + Actara 25 WG phun lúc cây ra đọt và lá non giúp ngừa được cả rầy bông Xoài và sâu đục đọt Xoài, không phun dầu khoáng giai đọan hoa đang nở. Phun đồng loạt trên khu vực rộng sẽ có hiệu quả cao hơn.',
          '- Phun thuốc hóa học: Nên dùng các loại thuốc có nguồn gốc sinh học và tuân thủ nguyên tắc 4 đúng.',
        ],
      ],
    },
  },
  {
    id: 6,
    name: 'Phun thuốc',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413848/menu/cleaning_bl0qex.png',
    route: 'TempScreen',
  },
  {
    id: 7,
    name: 'Tưới nước',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605413962/menu/002-watering-can_jqt74h.png',
    route: 'TempScreen',
    type: {
      'Thông tin':  'Khi bón phân nên xới vòng tròn theo hình chiếu tán cây, trộn phân đều vào đất, sau đó tưới nước và tủ cỏ giữ ẩm.',
    },
  },
  {
    id: 8,
    name: 'Bao trái',
    album:
      'https://res.cloudinary.com/huy-thanh-nguyen/image/upload/v1605713555/menu/sack_tm82cd.png',
    route: 'TempScreen',
    type: {
      'Thông tin':  'Bao trái sẽ hạn chế được số lần phun thuốc hóa học từ 5 - 7 lần/vụ, giúp vỏ trái bóng đẹp, bán được giá cao, góp phần hạ giá thành sản phẩm, tăng lợi nhuận, giúp giảm ô nhiễm môi trường và không tồn dư thuốc BVTV trên trái.',
    },
  },
];

export default Menu;
