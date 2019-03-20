/*
Transformer – преобразовывает данные из ответа сервера и отдает их Renderer
Transformer – Базовый класс реализует метод получения строки и преобразования её в json.
*/
class Transformer {

    stringToJson(string) {
        return string.json();
    }

    shouldShowErrorMessage(response) {
        if (response.status === 404) {
            return true;
        }
        return false;
    }

}


