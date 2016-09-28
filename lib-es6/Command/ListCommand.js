import forever from "forever"
import thunkify from "thunkify"

const list = thunkify(forever.list);

/**
 * Start command
 */
export default class StartCommand
{
    /**
     * Get command name
     *
     * @return  {string}    Command name
     */
    getName()
    {
        return "forever:list";
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Parameters
     * @param   {Array}     options     Options
     */
    *execute(parameters, options)
    {
        let processes = yield list(false);
        console.log(processes);
    }
}
