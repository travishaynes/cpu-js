cpujs
=====

A ~1K (compressed) background-job library written in JavaScript.

This library was written primarily to handle the AI in a JavaScript game I've
been working on.


Usage
=====

### new

#### Example: Creating a new CPU instance.

    cpu = new CPU();

### start

#### Example: Starting the CPU.

    cpu.start();

### stop

#### Example: Stopping the CPU.

    cpu.stop();

### reboot

#### Example: Restarting the CPU.

    cpu.reboot();

### throttle

**Default:** 1

Controls the amount of time between CPU ticks. The ticks are in milliseconds,
but the actual time to process the stack will vary depending on how many jobs
are in the queue.

Changes to the throttle while the CPU is running will not be applied until the
CPU instance is rebooted:

#### Example: Changing the throttle after the CPU has been started.

    var cpu = new CPU();
    
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

`this` within the called function will be the job, which contains these
attributes:

    func        The function to call for the job
    cycle       The current job cycle
    cycles      The total job cycles
    interval    The interval between cycles

When the function is called, the first argument passed will be the CPU instance
it is registered to.


#### Example: Register a job that will execute only 5 times.

    var cpu = new CPU()
      , job = function(){
          console.log(
            "this job has run " + this.cycle + " times, and is scheduled to " +
            "run " + this.cycles + " times total."
          );
        };
    
    cpu.register(job, 100, 5);
    cpu.start();

#### Example: Register a job that will execute an infinite amount of times.

    var cpu = new CPU()
      , job = function(){
          console.log("To infinity, and beyond!");
        };
    
    cpu.register(job, 100, 0);
    cpu.start();


### unregister

`CPU.unregister(index)`

    index       The index of the registered job

**Returns** *(Object)* - The job that was unregistered.

#### Example: Unregister a job from within a running job.
    
    var cpu = CPU.new
      , job = function(){
          console.log("this is an infinite job, but will only run once.");
          cpu.unregister(cpu.indexOf(this));
        };
    
    cpu.register(job, 100, 0);
    cpu.start();


### indexOf

`CPU.indexOf(job)`

    job         The job to find

**Returns** *(Integer)* - The index of the job, or -1 if the job is not found.

#### Example: Register a job, find it, and unregister it.

    var cpu = new CPU()
      , job = function() {};
    cpu.register(job, 100, 0);
    cpu.unregister(cpu.indexOf(job));
