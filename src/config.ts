

enum Modes {
    test = 'test',
    live = 'live'
}

interface IAppConfig {
    mode: 'test' | 'live',
    publicKey: string,
}

const mode = Modes.test;
const publicKey = mode as Modes == Modes.live ? 'pk_live_9da718a344de69de7a6bae8cc888cbb621a12419' : 'pk_test_1d370c765cee4bad118143a4e1f01c0a9e1c6ce1' 

const config: IAppConfig = {
    mode,
    publicKey
}

export default config;