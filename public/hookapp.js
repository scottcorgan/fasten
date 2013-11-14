var fasten = Fasten.connect('github/column', 'e89d4a5ef5830e75b5356040f6f911d9');

fasten.hook(function (data) {
  console.log('=======================================')
  console.log(data);
});
