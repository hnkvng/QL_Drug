import { launchImageLibrary , launchCamera} from 'react-native-image-picker';

type typImgRq = typeof launchCamera | typeof launchImageLibrary;

async function handleImg (handleMethod : typImgRq) {
    const result = await handleMethod({
        mediaType: 'photo',
        quality: 1,
        assetRepresentationMode: 'current',
    });
    if(result.assets)
        return {uri:result.assets[0].uri};
    return {uri: ''}
}

export default handleImg;