var fasten = Fasten.connect('github/column', '3044a27eb5172359e28285c639722d95');

fasten.hook(function (data) {
  console.log('=======================================')
  console.log(data);
});
