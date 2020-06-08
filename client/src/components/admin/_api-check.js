// Проверка имени альбомов на ключевые слова
const checkAlbumsNames = (albumsArray) => new Promise((resolve, reject) => {

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболк', 'поло', 'ремни', 'галстук', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a', 'куртк', 'ветровк', 'пальто', 'плащ',
        'обувь', 'свитер', 'кардиган', 'худи', 'свитшот', 'олимпийк', 'рубашк', 'рубах', 'джинс', 'чинос', 'брюк',
        'пиджак', 'костюм', 'майк', 'аксессуар', 'женск', 'шорты', 'низ', 'верх', 'взуття', 'одяг', 'обновление',
        'в наявност', 'обновка', 'кепк', 'шапк', 'есть', 'в продаж', 'мужское', 'о б у в ь', 'а к с е с с у а р ы',
        'о б н о в л е н и е', 'наличи', 'C L O T H I N G', 'новые',
    ];

    console.log('checkAlbumsNames', albumsArray);

    let arr = [];

    albumsArray.map((item) => {
        albumTitleKeys.map((element) => {
            if (item.title.toLowerCase().includes(element.toLowerCase()) && !arr.includes(item)) {
                console.log(element, item);
                arr.push(item);
            }
            return null;
        });
        return null;
    });
    if (!arr.length) {
        reject('(array is empty');
    } else {
        resolve(arr); // массив отобранных альбомов
    }
});

const checkPhotoForPrice = (photoObj) => new Promise((resolve, reject) => {
    // const currency = ['цена', 'price'];
    // const keysUa = ['uah', 'грн', 'гривен'];
    // const keysRu = ['uah', 'руб', 'рублей', '₽'];
    // const keysBl = ['byn', 'руб'];



});

export {
    checkAlbumsNames,
    checkPhotoForPrice
};
