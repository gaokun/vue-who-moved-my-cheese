
function WhoMovedMyCheese(vueComponent, watcherNameArr, callback) {
  if (!vueComponent || !watcherNameArr || watcherNameArr.length === 0) {
    console.error('WhoMovedMyCheese -> invalid params');
    return;
  }
  if (typeof watcherNameArr === 'string') {
    watcherNameArr = [watcherNameArr];
  }
  vueComponent._watchers.forEach(watcher => {
    const watcherName = watcher.getter.name || watcher.expression;
    watcher.deps.forEach(dep => {
      if (watcherNameArr.includes(watcherName)) {
        const notify = dep.notify;
        dep.notify = () => {
          notify.call(dep);
          if (callback) {
            callback(watcherName, dep.name);
          } else {
            console.log(`WhoMovedMyCheese: ${watcherName} updated by ${dep.name}`);
          }
        };
      }
    });
  });
}


module.exports = {
  WhoMovedMyCheese
};
