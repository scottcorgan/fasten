var fasten = Fasten.connect('github/column', 'ba7ef24b811f2429c8eb8be7f2ccfe49');

fasten.hook(function (data) {
  console.log('=======================================')
  console.log(data);
});
