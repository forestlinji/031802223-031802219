console.log('test')

const assert = require('assert');
const testJs = require('../global');
describe('#global.js', () => {

    describe('正常情况', () => {
        it('单棵树正常情况', () => {


            var out = testJs.parse(
                `导师：张三
2016级博士生：天一、王二、吴五、A、B
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：JAVA、数学建模

李二：字节跳动、京东云

王二：Python`);
            // console.log(out);
        });

        it('多棵树正常情况1', () => {
            var inputText = `导师：张三
2016级博士生：天一、王二、吴五、A、B
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：JAVA、数学建模

李二：字节跳动、京东云

王二：Python


导师：张三
2016级博士生：天一、王二、吴五、A、B
2015级硕士生：李四、王五
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、张三

刘六：JAVA、数学建模

李二：字节跳动、京东云

王二：Python


导师：张三
2016级博士生：天一、王二、吴五、A
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：JAVA、数学建模

李二：字节跳动、京东云

王二：Python`;
            inputText.split('\n\n\n').forEach(item => {
                var out = testJs.parse(item);
                // console.log(out);
            })

        });

        it('多棵树正常情况2', () => {
            var inputText = `导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

刘六：JAVA、数学建模

李二：字节跳动、京东云


导师：张三
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

李三：JAVA、数学建模

刘一：字节跳动、京东云


导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六

王五：JAVA、数学建模`;
            inputText.split('\n\n\n').forEach(item => {
                var out = testJs.parse(item);
                // console.log(out);
            })

        });
    });


    describe('异常情况', () => {
        it('导师信息异常', () => {
            assert.throws(() => {
                testJs.parse(`张三
2016级博士生：天一、王二、吴五、A
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：JAVA、数学建模

李二：字节跳动、京东云

王二: Python`)
            }, Error);
        });

        it('全角半角符号异常1', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生:王六
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：JAVA、数学建模

李二：字节跳动、京东云`)
            }, Error);
        });

        it('全角半角符号异常2', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生: 天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

刘六：JAVA、数学建模

李二：字节跳动、京东云`)
            }, Error);
        });

        it('学生技能异常1', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生：天一、王二、吴五、A
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七

刘六：

李二：字节跳动、京东云`)
            }, Error);
        });

        it('学生技能异常2', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生：天一、王二、吴五、A
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017：gsagesg

dshresh`)
            }, Error);
        });

        it('不存在的学生异常', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三

刘六：JAVA、数学建模

李二：字节跳动、京东云`)
            }, Error);
        });

        it('不存在的学生异常', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三

刘六：JAVA、数学建模

李二：字节跳动、京东云`)
            }, Error);
        }); 
        
        it('关键词异常', () => {
            assert.throws(() => {
                testJs.parse(`导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

刘六：JAVA、数学建模

李二：字节跳动、京东云`)
            }, Error);
        }); 
    });


});