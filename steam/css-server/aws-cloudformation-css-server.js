{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "AWS CloudFormation Sample Template EC2_Instance_With_Ephemeral_Drives: Example to show how to attach ephemeral drives using EC2 block device mappings. **WARNING** This template creates an Amazon EC2 instance. You will be billed for the AWS resources used if you create a stack from this template.",
    "Parameters": {
        "AvailabilityZone": {
            "Description": "Server Availability Zone",
            "Type": "AWS::EC2::AvailabilityZone::Name",
            "ConstraintDescription": "must be the name of an availability zone."
        },
        "KeyName": {
            "Description": "Name of an existing EC2 KeyPair to enable SSH access to the web server",
            "Type": "AWS::EC2::KeyPair::KeyName",
            "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
        },
        "InstanceType": {
            "Description": "WebServer EC2 instance type",
            "Type": "String",
            "Default": "t2.micro",
            "AllowedValues": [
                "t1.micro",
                "t2.nano",
                "t2.micro",
                "t2.small",
                "t2.medium",
                "t2.large",
                "m1.small",
                "m1.medium",
                "m1.large",
                "m1.xlarge",
                "m2.xlarge",
                "m2.2xlarge",
                "m2.4xlarge",
                "m3.medium",
                "m3.large",
                "m3.xlarge",
                "m3.2xlarge",
                "m4.large",
                "m4.xlarge",
                "m4.2xlarge",
                "m4.4xlarge",
                "m4.10xlarge",
                "c1.medium",
                "c1.xlarge",
                "c3.large",
                "c3.xlarge",
                "c3.2xlarge",
                "c3.4xlarge",
                "c3.8xlarge",
                "c4.large",
                "c4.xlarge",
                "c4.2xlarge",
                "c4.4xlarge",
                "c4.8xlarge",
                "g2.2xlarge",
                "g2.8xlarge",
                "r3.large",
                "r3.xlarge",
                "r3.2xlarge",
                "r3.4xlarge",
                "r3.8xlarge",
                "i2.xlarge",
                "i2.2xlarge",
                "i2.4xlarge",
                "i2.8xlarge",
                "d2.xlarge",
                "d2.2xlarge",
                "d2.4xlarge",
                "d2.8xlarge",
                "hi1.4xlarge",
                "hs1.8xlarge",
                "cr1.8xlarge",
                "cc2.8xlarge",
                "cg1.4xlarge"
            ],
            "ConstraintDescription": "must be a valid EC2 instance type."
        },
        "SSHLocation": {
            "Description": "Lockdown SSH access to the bastion host (default can be accessed from anywhere)",
            "Type": "String",
            "MinLength": "9",
            "MaxLength": "18",
            "Default": "0.0.0.0/0",
            "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
            "ConstraintDescription": "must be a valid CIDR range of the form x.x.x.x/x."
        }
    },
    "Mappings": {},
    "Resources": {
        "EC2Instance": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "AvailabilityZone": {
                    "Ref": "AvailabilityZone"
                },
                "KeyName": {
                    "Ref": "KeyName"
                },
                "InstanceType": {
                    "Ref": "InstanceType"
                },
                "ImageId": "ami-28cff44b",
                "SecurityGroups": [{
                    "Ref": "EC2SecurityGroup"
                }],
                "BlockDeviceMappings": [{
                    "DeviceName": "/dev/sdc",
                    "VirtualName": "ephemeral0"
                }],
                "UserData": "IyEvYmluL2Jhc2gNCndnZXQgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL25pY2tncmVhbHkvYXdzLXByb2plY3RzL21hc3Rlci9zdGVhbS9jc3Mtc2VydmVyLzFfaW5zdGFsbC5zaCAtUCAvdG1wDQpjaG1vZCA3NzcgL3RtcC8xX2luc3RhbGwuc2gNCnN1ZG8gL3RtcC8xX3NlcnZlci5zaA0K"
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "d4385077-80f3-40ba-8713-261908e7ac91"
                }
            }
        },
        "EC2SecurityGroup": {
            "Type": "AWS::EC2::SecurityGroup",
            "Properties": {
                "GroupDescription": "SSH access",
                "SecurityGroupIngress": [{
                        "IpProtocol": "tcp",
                        "FromPort": "22",
                        "ToPort": "22",
                        "CidrIp": {
                            "Ref": "SSHLocation"
                        }
                    },
                    {
                        "IpProtocol": "tcp",
                        "FromPort": "1200",
                        "ToPort": "1200",
                        "CidrIp": "0.0.0.0/0"
                    },
                    {
                        "IpProtocol": "tcp",
                        "FromPort": "27000",
                        "ToPort": "27015",
                        "CidrIp": "0.0.0.0/0"
                    },
                    {
                        "IpProtocol": "udp",
                        "FromPort": "27000",
                        "ToPort": "27015",
                        "CidrIp": "0.0.0.0/0"
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "a6c6aa27-2ace-497e-a45e-70ec6388a24a"
                }
            }
        }
    },
    "Outputs": {
        "Instance": {
            "Value": {
                "Fn::GetAtt": [
                    "EC2Instance",
                    "PublicDnsName"
                ]
            },
            "Description": "DNS Name of the newly created EC2 instance"
        }
    },
    "Metadata": {
        "AWS::CloudFormation::Designer": {
            "a6c6aa27-2ace-497e-a45e-70ec6388a24a": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 60,
                    "y": 90
                },
                "z": 1,
                "embeds": []
            },
            "d4385077-80f3-40ba-8713-261908e7ac91": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 180,
                    "y": 90
                },
                "z": 1,
                "embeds": [],
                "ismemberof": [
                    "a6c6aa27-2ace-497e-a45e-70ec6388a24a"
                ]
            }
        }
    }
}