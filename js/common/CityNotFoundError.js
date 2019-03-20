class CityNotFoundError {
    constructor(stack) {
        this.stack = stack;
        this.message = 'requested city was not found';
        this.name = 'City not found'
    }
}