// <<<<<<<<<<<<说明>>>>>>>>>>>>>
// 当配置文件添加了多个订阅时，有时会遇到相同的节点名，在选择节点会把相同的节点名都打☑️，所以在节点名后面加个随机字符作为唯一标识，作为区分。要使用请先更新订阅会自动生成随机字符串，若不想给某个订阅生成随机，则右键插件在配置插件中填入订阅文件名（类似ID_agw46r7e），若想修改随机串长度，也请右键修改随机串长度默认值
// 把本插件放置在所有插件的最后，以免更新订阅出现失败
// <<<<<<<<<<<<结束>>>>>>>>>>>>>

function randStr(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  let randomString = ''; 

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // 生成一个随机索引
    randomString += characters.charAt(randomIndex); // 使用随机索引从字符集中获取字符并添加到随机字符串
  }

  return randomString;
}
function checkSubFileInPath(a, b) {
  if (a.length === 0) {
    return false; 
  }
  return a.some(element => b.includes(element));
}
 /* 触发器 手动触发 */
const onRun = async () => {
  let num = prompt("请指定字符串长度(输入数字)：");
  while (true) {
    if (num>0) {
      const rs = randStr(num);
      await Plugins.confirm('随机字符串', rs);
      //复制文本
      await Plugins.ClipboardSetText(rs);
      await Plugins.message.success('已复制');
      break;
    }else num = prompt("输入的不是大于0的数字, 请重新输入");
  }
}
const onSubscribe = async (proxies, subscription) => {
  if (!(await checkSubFileInPath(Plugin.SUB_FNAMES, subscription.path))) {
    proxies = proxies.map((v) => {
      return {
        ...v,
        tag: v.tag.replace(/(_.*)?$/, `_${randStr(Plugin.RAND_LEN)}`)
      }
    });
  }
  return proxies;
};
