/*
Transformer – преобразовывает данные из ответа сервера и отдает их Renderer
Transformer – Базовый класс реализует метод получения строки и преобразования её в json.
*/

function Transformer(tr) {
    this.tr = tr;   
};

Transformer.prototype.stringToJson = function(string) {
    return string.json();
};

