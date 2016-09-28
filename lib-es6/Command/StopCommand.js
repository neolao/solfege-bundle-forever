import forever from "forever";

/**
 * Stop command
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
        return "forever:stop";
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Parameters
     * @param   {Array}     options     Options
     */
    *execute(parameters, options)
    {
        let index = parameters[0];
        forever.stop(index);
    }
}
