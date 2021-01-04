import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, Form, Row, Col, Input, Select, message, Radio, Button, Checkbox, Upload } from 'antd';
import { getQueryString, validateVersion } from '@/utils/utils';
const Option = Select.Option;

@Form.create()

class Record extends React.PureComponent {

  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.oneOf(['new', 'edit']),
    recordData: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    type: 'new',
    recordData: {},
    onOk: () => { },
    onCancel: () => { }
  }

  convertToUploadValue(url) {
    let file = {
      uid: '-1',
      name: url.split('/').pop(),
      status: 'done',
      response: {
        code: 200,
        data: url
      } // 服务端响应内容
    }
    return [
      file
    ]
  }

  ok = () => {
    const { dispatch, form: { validateFields }, type, onOk } = this.props;
    validateFields(async (errors, values) => {
      if (!errors) {
        const basicPackageUrl = values.uploadFile[0].response.data;
        onOk({
          type,
          values: {
            appName: values.appName,
            appVersion: values.appVersion,
            build: values.build,
            unionId: values.unionId,
            channelId: values.channelId,
            basicPackageUrl
          }
        });

      }
    });
  }

  cancel = () => {
    this.props.onCancel()
  }

  normFile = e => {
    console.log('Upload event:', e);
    let fileList;
    if (Array.isArray(e)) {
      fileList = e;
    } else if (e) {
      fileList = e.fileList;
    }
    fileList = fileList.slice(-1);

    if ([undefined, 'error'].includes(fileList[0].status)) {
      fileList = [];
    } else if (fileList[0].status === 'done' && fileList[0].response.code != 200) {
      fileList = [];
      message.warn(fileList[0].response.retMessage);
    }
    
    console.log("Record -> fileList", fileList)
    return fileList.slice(-1);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    };
    const { visible, type, recordData, form: { getFieldDecorator, getFieldValue } } = this.props;
    const isEdit = type === 'edit';
    const uploadFile = (getFieldValue('uploadFile') || []).slice(-1);
    const status = (uploadFile[0] || {}).status || 'upload';
    
    console.log("Record -> render -> status", getFieldValue('uploadFile'), status)
    return (
      <Modal
        title={isEdit ? '编辑自定义打包' : '新增自定义打包'}
        visible={visible}
        width={700}
        destroyOnClose={true}
        onCancel={this.cancel}
        onOk={this.ok}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Row>
            <Col span={24}>
              <Form.Item label="APP名称" {...formItemLayout}>
                {getFieldDecorator('appName', {
                  initialValue: isEdit ? recordData.appName : undefined,
                  rules: [{
                    required: true, message: '请输入版本名称'
                  }, {
                    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
                    message: '请输入汉字、数字、英文字母'
                  }],
                  getValueFromEvent: (event) => {
                    return event.target.value.replace(/\s+/g, "")
                  }
                })(
                  <Input maxLength={15} placeholder="请输入版本名称" />
                )}
              </Form.Item>
              <Form.Item label="APP版本号" {...formItemLayout}>
                {getFieldDecorator('appVersion', {
                  initialValue: isEdit ? recordData.appVersion : undefined,
                  rules: [{
                    required: true, message: '请输入版本号'
                  }, {
                    validator(rule, value) {
                      if (validateVersion(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('版本号格式为:xx.xx.xx');
                    },
                  }
                  ],
                })(
                  <Input maxLength={10} placeholder="请输入版本号，例如：6.2.0" />
                )}
              </Form.Item>
              <Form.Item label="构建号" {...formItemLayout}>
                {getFieldDecorator('build', {
                  initialValue: isEdit ? recordData.build : undefined,
                  rules: [{
                    required: true, message: '请输入构建号'
                  }, {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: '请输入数字、英文字母'
                  }],
                })(
                  <Input maxLength={20} placeholder="请输入构建号" />
                )}
              </Form.Item>
              <Form.Item label="联盟号" {...formItemLayout}> 
                {getFieldDecorator('unionId', {
                  initialValue: isEdit ? recordData.unionId : undefined,
                  rules: [{
                    required: true, message: '请输入联盟号'
                  }, {
                    pattern: /^[1-9][0-9]+$/,
                    message: '请输入数字'
                  }],
                })(
                  <Input placeholder="请输入联盟号" />
                )}
              </Form.Item>
              <Form.Item label="渠道号" {...formItemLayout}>
                {getFieldDecorator('channelId', {
                  initialValue: isEdit ? recordData.channelId : undefined,
                  rules: [{
                    required: true, message: '请输入渠道号'
                  }, {
                    pattern: /^(\d|[a-z]|-|_)+$/,
                    message: '请输入数字、英文、_、-'
                  }],
                })(
                  <Input maxLength={50} placeholder="请输入渠道号" />
                )}
              </Form.Item>
              {/* extra={status === 'done' && <div style={styles.fileUrl}>{uploadFile[0].name}</div>} */}
              <Form.Item label="基础包" required {...formItemLayout} >
                {getFieldDecorator('uploadFile', {
                  initialValue: isEdit && recordData.basicPackageUrl ? this.convertToUploadValue(recordData.basicPackageUrl) : [],
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [{
                    required: true, message: '请上传'
                  }],
                })(
                  <Upload
                    disabled={status === 'uploading'}
                    withCredentials={true}
                    showUploadList={{showRemoveIcon: false, showDownloadIcon:false}}
                    // action="https://dlupload.jd.com/uploadimg"
                    action={`${cbuildDomain}/packapi/customPackaging/uploadApk`}
                    accept='.apk,.APK'
                    beforeUpload={file => {
                      if (/[`~!@#$%^&*()\+=<>?:"{}|,\/;'\\[\]~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘'，。、]/.test(file.name)) {
                        message.warn('文件名含特殊字符');
                        return false;
                      }
                      return true;
                    }}
                  >
                    <Button disabled={status == 'uploading'}>{{
                      upload: '上传',
                      uploading: '上传中',
                      done: '重新上传',
                      error: '上传失败，重新上传'
                    }[status]}</Button>
                  </Upload>
                )}
              </Form.Item>
              {/* <Form.Item label="基础包" required {...formItemLayout}>
                <Upload
                  disabled={status == 'uploading'}
                  withCredentials={true}
                  name='file'
                  action={`${cbuildDomain}/packapi/customPackaging/uploadApk`}
                  accept='.apk,.APK'
                  showUploadList={{ showRemoveIcon: false }}
                  beforeUpload={file => {
                    if (/[`~!@#$%^&*()\+=<>?:"{}|,\/;'\\[\]~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘'，。、]/.test(file.name)) {
                      message.warn('文件名含特殊字符');
                      return false;
                    }
                    return true;
                  }}
                  onChange={this.handleChange}
                  fileList={this.state.fileList}
                >
                  <Button disabled={status == 'uploading'}>{{
                    upload: '上传',
                    uploading: '上传中',
                    done: '重新上传',
                    error: '上传失败，重新上传'
                  }[status]}</Button>
                </Upload>
                {getFieldDecorator('basicPackageUrl', {
                  initialValue: undefined,
                  rules: [{
                    required: true,
                    message: '请上传基础包'
                  }, {
                    pattern: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/,
                    message: '文件名含特殊字符'
                  }]
                })(
                  <Input style={styles.hiddenInp} />
                )}
              </Form.Item> */}
              {/* {fileList ?.length <= 0 && <a href={item.filepath}>{item.filepath}</a>} */}
            </Col>
          </Row>
        </Form>
      </Modal >
    );
  }
}

const styles = {
  hiddenInp: {
    display: 'none'
  },
  fileUrl: {
    lineHeight: '20px',
    wordBreak: 'break-all'
  }
}

export default Record;