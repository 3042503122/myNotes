# 数据录入

## Select

### 带搜索

```
<Select 
	showSearch 
	optionFilterProp="children" 
	filterOption={(input, option) =>
		option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
	} 
```

### 标签

![](E:\self\记录\myNotes\images\antd_1.png)

```
<Select
	mode="tags"
```



## 下拉框+输入框组合

![](E:\self\记录\myNotes\images\antd_2.png)

```
<FormItem className="shopGroup" label="条件" {...formItemLayout}>
  <FormItem className="shopGroupSelect">
    {getFieldDecorator('source', {
      initialValue: Object.keys(sourceOptions)[0],
    })(
      <Select placeholder="请选择">
        {Object.entries(sourceOptions).map(el => {
          return (
            <Option value={el[0]} key={el[0]}>
              {el[1]}
            </Option>
          );
        })}
      </Select>
    )}
  </FormItem>
  <FormItem className="shopGroupInput">
    {getFieldDecorator('pin', {
      initialValue: this.props.pin || '',
    })(<Input placeholder="请输入" />)}
  </FormItem>
</FormItem>
```

```
      .shopGroup{
        .ant-form-item-children{
          display:flex;
          align-items: center;
        }
        .shopGroupSelect{
          margin-right: 10px;
        }
        .shopGroupInput{
          flex: 1;
        }
      }
```



## 开始时间 - 结束时间

![](E:\self\记录\myNotes\images\antd_3.png)

```
const formatDate = 'YYYY-MM-DD HH:mm:ss';

<FormItem className="DatePickerGroup" label="注册时间" {...formItemLayout}>
  <FormItem className="DatePickerItem">
    {getFieldDecorator('startTime', {
    })(
      <DatePicker format={formatDate} placeholder="请选择日期" showTime disabledDate={disabledCurrentDay} style={{minWidth: 'auto'}}/>
    )}
  </FormItem>
  <span className="DatePickerSep">-</span>
  <FormItem className="DatePickerItem">
    {getFieldDecorator('endTime', {
    })(
      <DatePicker format={formatDate} placeholder="请选择日期" showTime disabledDate={disabledCurrentDay} className="DatePickerItem" style={{minWidth: 'auto'}}/>
    )}
  </FormItem>
</FormItem>
```

```
      .DatePickerGroup{
        .ant-form-item-children{
          display:flex;
          align-items: center;
        }
        .DatePickerItem{
          flex: 1;
        }
        .DatePickerSep{
          width: 20px;
          text-align: center;
          margin-bottom: 10px;
        }
      }
```



## 不能选择今天以及今天以前的日期

```
<DatePicker className="startDate" disabledDate={(current) => current && current < moment().endOf('day')} />
```

## 不能选今天以前的日期

```
<DatePicker className="startDate" disabledDate={(current) => current && current < moment().subtract(1, 'days').endOf('day')} />
```

## 当前日期在计划开始日期之前，可选今日；否则

```
disabledDate={(current) => {
	if (moment().isBefore(planStartTime)) {
		return current && current < moment().subtract(1, 'days').endOf('day')
	} else {
		return current && current < moment().endOf('day')
	}
	
}}
```



## 用Input代替InputNumber

由于InputNumber可以设置 min max ，例如max=99 当输入999时仍然可以输入 失去焦点后会自动变成 99，该失去焦点可能是点击确定按钮，以至于用户不知道被999修改成99

- 价格 (可为‘’  可为0)

```
<FormItem>
  {getFieldDecorator(`edit_lineprice_${record.skuId}`, {
    initialValue: text || '',
    rules: [{
   validator: (rule, value, callback)=>{
    value = value.trim();
    if (value === '' || Number(value) === 0) {
      callback();
    } else if (isNaN(Number(value))) {
      callback('请输入正确的划线价');
    }else if (Number(value) < 0 || Number(value) > 100000) {
      callback('须 0-100000');
    } else if (!/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
      callback('小数点后保留2位小数');
    }
    callback();
  }
    }],
  })(
    <Input className="skuInfoManage__inpNumber" size="small" placeholder="须 0-100000"></Input>
  )}
```

- 正整数 (可为‘’  可为0)

  ```
  <FormItem>
    {getFieldDecorator(`edit_salesstock_${record.skuId}`, {
      initialValue: text || '',
      rules: [{
        validator: (rule, value, callback)=>{
          value = value.trim();
          if (value === '' || Number(value) === 0) {
            callback();
          } else if (isNaN(_price) || !/^[1-9][0-9]*$/.test(value)) {
            callback('请输入0-100000之间整数');
          }else if (Number(value) < 0 || Number(value) > 100000) {
            callback('须 0-100000');
          }
          callback();
        }
      }],
    })(
      <Input className="skuInfoManage__inpNumber" size="small" placeholder="须 0-100000" />
    )}
  </FormItem>
  ```

  

# 常用交互

## 最近操作人



```
erp: (text, record)=>{
  let textDOM = '-';
  if (text == null || text == undefined) {
    textDOM = '-';
  } else {
    textDOM = text;
  }
  return (<span>
        {textDOM}
        <Popover content="查看操作记录"><Icon type="clock-circle" className="TableIcon" onClick={() => this.toRecordPage(record)} /></Popover>
      </span>);
},
```



## table最后一列操作按钮太多

![](E:\self\记录\myNotes\images\antd_5.png)

```
    let dom_btn_close = (
      <Menu.Item key={`statusChange_${record.id}_4`}>关闭店铺</Menu.Item>
    );

    
<Dropdown overlay={
    <Menu onClick={(e)=>this.handleMenuClick(e)}>
      {(record.status == 2 || record.status == 5) && dom_btn_open}
      {(record.status == 2 || record.status == 4 || record.status == 5) && dom_btn_reset}
      {record.status == 2 && dom_btn_nopromote}
      {record.status == 4 && dom_btn_act}
      {record.status == 3 && dom_btn_close}
      {(record.status == 3 && record.openTeamStatus == 1) && dom_btn_openteam}
      {(record.status == 3 && (record.openTeamStatus == 2 || record.openTeamStatus == 3)) && dom_btn_closeteam}
      {record.operatorRegionId == 8 && record.flag == 0 && dom_btn_opensign}
      {record.operatorRegionId == 8 && record.flag == 1 && dom_btn_closesign}
    </Menu>
  }>
  <Button className="OneBtn" size="small" type="primary">...</Button>
</Dropdown>


  // 操作...
  handleMenuClick(e) {	
    let [type, id, status] = e.key.split('_');
    switch (type) {
      case 'statusChange':
        this.statusChange(id, status);
        break;
    
      case 'openTeamStatusChange':
        this.openTeamStatusChange(id, status);
        break;
    
      case 'flagChange':
        this.flagChange(id, status);
        break;
    
      default:
        break;
    }

  }
```



## 搜索条件太多，收起一部分

![](E:\self\记录\myNotes\images\antd_4.png)

```
// https://codesandbox.io/s/react-jpv5f / components /SearchExpand /
```



## …悬浮出详情

- Tooltip

  ```
  return text.length >= 10 ? (
              <Tooltip placement="top" title={text}>
                {text.slice(0, 12)}...
              </Tooltip>
            ) : (
              text
            );
  ```

- Popover

  ```
  let limitCount = 8;
              if (text.length > limitCount) {
                return (
                  <Popover content={text}>
                    <span style={{ cursor: 'pointer' }}>{text.substring(0, limitCount)}...</span>
                  </Popover>
                );
              } else {
                return text;
              }
  ```

  

## table  Popover编辑

```
render: (text, record)=>{
  return (<span>
    ¥{text}
    <Popover
      trigger="click"
      visible={this.state[`lineprice_${record.skuId}`]}
      overlayClassName="TablePopover"
      title="修改划线价"
      content={<div>
            <FormItem>
              {getFieldDecorator(`edit_lineprice_${record.skuId}`, {
                initialValue: text || '',
                rules: [{
                  required: true,
                  message: '请输入'
                }],
              })(
                <InputNumber className="skuInfoManage__inpNumber" size="small" min={0} placeholder="请输入"></InputNumber >
              )}
            </FormItem>
            <div className="PopoverBtnBlock">
              <Button loading={this.props.updateLoading} size="small" type="primary" onClick={() => this.updateLinePrice(record.skuId)}>确定</Button>
            </div>
          </div>}
      onVisibleChange={visible =>
        this.handleVisibleChange(`lineprice_${record.skuId}`, visible)
      }
    >
      <Icon className="TableIcon" type="edit" />
    </Popover>
  </span>)
}

  handleVisibleChange(type, visible) {
    this.setState({
      [type]: visible,
    });
  }
  
  updateLinePrice(skuId) {
  let key = `edit_lineprice_${skuId}`;
  this.props.form.validateFields([key], (error, values)=>{
    if (!error){
      let linePrice = values[key]
      
      this.props.dispatch({
        type: 'skuInfoManage/updateLinePrice',
        data:{
          linePrice,
          skuId
        },
        callback: res=>{
          if (res.code == 200){
            this.handleVisibleChange(`lineprice_${skuId}`, false);
            this.search(this.props.list.pageNo);
          }
        }
      });

      
    }
  })
}
```



# 导出查询结果

![](E:\self\记录\myNotes\images\antd_6.png)

```
<Button className="OtherButton" type="link" disabled={this.state.exportDisable} href={this.state.exportHref}  icon="export">
  导出查询数据(仅支持查询7天内数据)
</Button>
```

```
this.props.dispatch({
  type: 'recruitManage/getList',
  data: {
    ...param,
    pageNo,
    pageSize: 10
  },
  callback: (res)=>{
    const MAX_DAYS = 7;
    let days_distance = 999;
    if (param.startTime && param.endTime) {
      days_distance = moment_endTime.diff(moment_startTime, 'days', true);
    }
    console.log("TCL: RecruitManage -> search -> days_distance", days_distance)
    if (MAX_DAYS >= days_distance && res.code == 200 && res.data.total > 0) {
      this.setState({
        exportHref: `/enlist/export/table?${serializeObject(param)}`,
        exportDisable: false
      })
    } else {
      this.setState({
        exportHref: '',
        exportDisable: true
      })
    }

  }
});
```



# Table不显示分页

//  pagination={false}

```
<Table
	columns={columns}
	dataSource={this.props.historyList}
	loading={this.props.historyLoading}
	pagination={false}
	rowKey="id"
/>
```

