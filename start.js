// start.js

Page({

  /**
   * ҳ��ĳ�ʼ����
   */
  data: {
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '������������' ,checked:'ture'},
      { name: 'down', value: '������������' },
    ]
  },

  radioChange: function (e) {
    //���汨�����򵽵�ǰҳ�������
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function(){
    //�����������ݺͱ������򵽺�̨������
    var thres = this.data.threshold
    var Rule = this.data.rule
    const requestTask = wx.request({
      url: 'https://xxxxxxxx.xxxxxx.xx', //�ĳ���Ѷ�Ƹ�����������
      header: {
        'content-type': 'application/json',
      },

      //���͸�������������
      data:{
        threshold: thres,
        rule: Rule
      },
      success: function (res) {
        //�ɹ��õ����������ص����ݺ�ִ���������
        var flag = res.data;
        console.log(flag)
        //����1�򱨾�
        if(flag == "1"){
          wx.showModal({
            title: '������',
            content: '�¶ȹ���',
            success: function (res) {
              if (res.confirm) {
                console.log('�û����ȷ��')
              } else if (res.cancel) {
                console.log('�û����ȡ��')
              }
            }
          })
        }
        //����0�򲻱���
        else if (flag == "0"){
          wx.showModal({
            title: '��ʾ��',
            content: '�¶ȴ���������Χ��',
            success: function (res) {
              if (res.confirm) {
                console.log('�û����ȷ��')
              } else if (res.cancel) {
                console.log('�û����ȡ��')
              }
            }
          })
        }
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  getDataFromOneNet: function(){
    //��oneNET�������ǵ�Wi-Fi����վ������
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/20470765/datapoints?datastream_id=Light,Temperature,Humidity&limit=50',
      header: {
        'content-type': 'application/json',
        'api-key': 'EAXlG5aKHKM=H=j4PpO=cw530LY='
      },
      success: function (res) {
        //console.log(res.data)
        //�õ����ݺ󱣴浽ȫ������
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        //��ת������ҳ�棬�����õ������ݻ�ͼ
        wx.navigateTo({
          url: '../wifi_station/tianqi/tianqi',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })

  
  },

  change: function (e) {
    //��������ʱ����Ͱ�ť������������ð�ť
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  },

  /**
   * �������ں���--����ҳ�����
   */
  onLoad: function (options) {
  
  },

  /**
   * �������ں���--����ҳ�������Ⱦ���
   */
  onReady: function () {
  
  },

  /**
   * �������ں���--����ҳ����ʾ
   */
  onShow: function () {
  
  },

  /**
   * �������ں���--����ҳ������
   */
  onHide: function () {
  
  },

  /**
   * �������ں���--����ҳ��ж��
   */
  onUnload: function () {
  
  },

  /**
   * ҳ������¼���������--�����û���������
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * ҳ�����������¼��Ĵ�������
   */
  onReachBottom: function () {
  
  },

  /**
   * �û�������ϽǷ���
   */
  onShareAppMessage: function () {
  
  }
})
