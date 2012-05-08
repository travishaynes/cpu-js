cpujs
=====

A ~1K (compressed) background-job library written in JavaScript.

This library was written primarily to handle the AI in a JavaScript game I've
been working on.


Usage
=====

### new

To create a new CPU instance:

    cpu = new CPU();

### start

To start the CPU:

    cpu.start();

### stop

To stop the CPU:

    cpu.stop();

### reboot

To restart the CPU:

    cpu.reboot();

### throttle

`throttle` controls the amount of time between CPU ticks. The ticks are in
milliseconds, but the actual time to process the stack will vary depending on
how many jobs are in the queue.

Defaults to 1 millisecond between ticks.

Changes to the throttle while the CPU is running will not be applied until the
CPU instance is rebooted:

    // start a CPU instance
    cpu.start();
    
    // change the throttle
    cpu.throttle = 2;
    
    // reboot to apply the new throttle
    cpu.reboot();


### register

`CPU.register(func, interval, cycles)`

    func        The function to call
    interval    The interval between calls
    cycles      The amount of times to call the function

**Returns** *(Integer)* - The index of the registered function.

See the examples for more information on using this method.


### unregister

`CPU.unregister(index)`

    index       The index of the registered job

**Returns** *(Object)* - The job that was unregistered.


Examples
========

### How to register a job

    cpu.register(
        function(){
          console.log(
            "this job has run " + this.cycle + " times, and is scheduled to " +
            "run " + this.cycles + " times total."
          );
        }
      , 100
      , 5
    );


### How to register a job to run an infinite amount of times

    cpu.register(
        function(){
          console.log("to infinity, and beyond!");
        }
      , 100
      , 0 // <= zero = infinite
    );


### How to unregister a job from within the job

    cpu.register(
        function(){
          console.log("this is an infinite job, but will only run once.");
          cpu.unregister(cpu.indexOf(this));
        }
      , 100
      , 5
    );

