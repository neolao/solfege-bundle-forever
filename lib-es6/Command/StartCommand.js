import ContainerAwareCommand from "solfegejs-cli/lib/Command/ContainerAwareCommand";
import forever from "forever";

/**
 * Start command
 */
export default class StartCommand extends ContainerAwareCommand
{
    /**
     * Constructor
     *
     * @param   {string}    consolePath     Console file path
     */
    constructor(consolePath:string)
    {
        super();

        this.consolePath = consolePath;
    }

    /**
     * Configure command
     */
    *configure()
    {
        this.setName("forever:start");
        this.setDescription("Start another command and keep it forever alive");
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Parameters
     * @param   {Array}     options     Options
     */
    *execute(parameters, options)
    {
        // Get options
        let foreverOptions = {
            args: parameters,
            killTree: true
        };
        if (options.silent) {
            foreverOptions.silent = true;
        }
        if (options.max) {
            foreverOptions.max = parseInt(options.max);
        }
        if (options.pidFile) {
            foreverOptions.pidFile = options.pidFile;
        }
        if (options.logFile) {
            foreverOptions.logFile = options.logFile;
        }
        if (options.env) {
            let env = {};
            if (Array.isArray(options.env)) {
                for (let expression of options.env) {
                    let [variable, value] = expression.split("=");
                    env[variable] = value;
                }
            } else if (typeof options.env === "string") {
                let [variable, value] = options.env.split("=");
                env[variable] = value;
            }

            foreverOptions.env = env;
        }

        // Start the child process
        forever.startDaemon(this.consolePath, foreverOptions)
    }
}
