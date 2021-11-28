window.elements = new Map()

let counter = 0

const discardedImages: string[] = []

const onLoad = () => {
    const button = document.querySelector('#image_generator');
    const imagesLocation = document.querySelector('#images');
    const discaredImagesLocation = document.querySelector('#discarded_images');
    
    if(button && imagesLocation) {
        button.addEventListener('click', () => generateImage())
    }
    
    const onClick = (_event: MouseEvent, element: HTMLImageElement) => {
        document.body.contains(element) && imagesLocation?.removeChild(element)
        if(!discardedImages.find(id => id === element.id)) {
            createDiscaredImages(element)
        }
    }
    
    const getRandomImageUrl = async () => {
        const response = await fetch('https://picsum.photos/200')
        return response.url
    }
    
    const generateImage = async (id?: string) => {
        if(id) {
            const element = window.elements.get(id)
            if(element) {
                imagesLocation?.appendChild(element)
                element.addEventListener('click', (event) => onClick(event, element));
            }
        } else {
            const image = await getRandomImageUrl()
            const element = document.createElement('img')
            element.src = image
            const id = `image_${counter.toString()}`
            element.id = id
            window.elements.set(id, element)
            counter++
    
            imagesLocation?.appendChild(element)
            element.addEventListener('click', (event) => onClick(event, element));
        } 
    }

    const createDiscaredImages = (element: HTMLImageElement) => {
        discardedImages.push(element.id)
        const buttonElement = document.createElement('button')
        buttonElement.textContent = element.src
        discaredImagesLocation?.appendChild(buttonElement)
        buttonElement.addEventListener('click', () => generateImage(element.id))
    }
}

window.addEventListener('load', onLoad)

