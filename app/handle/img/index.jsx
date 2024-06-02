import { launchImageLibrary , launchCamera} from 'react-native-image-picker';

type typImgRq = typeof launchCamera | typeof launchImageLibrary;

async function handleImg (handleMethod : typImgRq, thunk: any) {
    const result = await handleMethod({
        mediaType: 'photo',
        quality: 1,
    });
    if(result.assets)
    return {uri:result.assets[0].uri};
    if(result.didCancel)
    return thunk.rejectWithValue();
}

export default handleImg;