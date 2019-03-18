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
            console.log('City not found. Try to find another city. ' +
            response.status);
            return true;
        }
        return false;
    }

}


