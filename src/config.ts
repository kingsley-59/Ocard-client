

enum Modes {
    test = 'test',
    live = 'live'
}

interface IAppConfig {
    mode: 'test' | 'live',
    publicKey: string,
    flwPublicKey: string,
    apiUrl: string
}

const mode: Modes = Modes.live;
const publicKey = mode as Modes == Modes.live ? 'pk_live_b939c28185f9b907669fe18fa7d138bc0dc8f71f' : 'pk_test_dfe0b6ac01f35dc0d4847f6a5d8f5d60f3dc78d4' 

const flwPublicKey = mode as Modes === Modes.live ? 'FLWPUBK-3be1ad62cee48e5e32df14ded30f49c5-X' : 'FLWPUBK_TEST-71c1472d0999461a86f9543557b47a28-X'

const config: IAppConfig = {
    mode,
    publicKey,
    flwPublicKey,
    apiUrl: 'http://localhost:3000',
}

export default config;