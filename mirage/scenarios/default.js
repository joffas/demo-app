export default function(server) {
  server.loadFixtures('estados');
  server.createList('pessoa', 2);
  //server.create('usuario', { email: 'jonathan.seibel@gmail.com', senha: '123456' });
  server.loadFixtures('usuarios');
  server.loadFixtures('cargos');
}
